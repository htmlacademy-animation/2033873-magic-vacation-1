precision mediump float;

uniform sampler2D map;
uniform float timestamp;
uniform float aspectRatio;

struct Bubble {
    vec2 bubblePosition;
    float bubbleRadius;
};

uniform Bubble bubble1;
uniform Bubble bubble2;
uniform Bubble bubble3;

uniform bool hasBubbles;
uniform float bubbleRadius;

varying vec2 vUv;

#define PI 3.141592

vec3 applyHue(vec3 aColor) {
    // тут почему то не получается использовать глобальную переменную PI, поэтому определяем локально
    float duration = 4.0;

    float currentTimePosition = mod(timestamp / 1000.0, duration);
    float currentHueDegrees = 0.0;

    if (currentTimePosition < 0.6) {
        currentHueDegrees = (1.0 - cos((currentTimePosition / 0.6) * PI)) * 6.0;
    } else if (currentTimePosition < 1.2) {
        currentHueDegrees = (1.0 - cos(((currentTimePosition) / 0.6) * PI)) * 4.0 + 2.0;
    } else if (currentTimePosition < 2.0) {
        currentHueDegrees = (1.0 - cos(((currentTimePosition - 1.2) / 0.8) * PI)) * 6.0 + 2.0;
    } else if (currentTimePosition < 2.8) {
        currentHueDegrees = (1.0 - cos(((currentTimePosition - 1.2) / 0.8) * PI)) * 8.0;
    }

    float angle = radians(currentHueDegrees);
    vec3 k = vec3(0.57735);
    float cosAngle = cos(angle);
    //Rodrigues' rotation formula
    return aColor * cosAngle + k * aColor * sin(angle) + k * dot(k, aColor) * (1.0 - cosAngle);
}

vec4 getBorderColor() {
    return texture2D(map, vUv) * vec4(1.0, 1.0, 1.0, 0.15);
}

void drawBubble(inout vec4 outputColor, in Bubble bubble) {
    vec2 currentPosition = vec2(vUv.x * aspectRatio, vUv.y);
    vec2 currentBubblePosition = vec2(bubble.bubblePosition.x * aspectRatio, bubble.bubblePosition.y);

    vec2 fromCurrentPixelToBubblePosition = currentPosition - currentBubblePosition;
    float distanceFromCurrentPixelToBubblePosition = length(currentPosition - currentBubblePosition);

    vec2 shift = vec2(0, 0);

    if (distanceFromCurrentPixelToBubblePosition > bubble.bubbleRadius) {
        return;
    }

    // подкрашиваем контуры пузырька
    if (distanceFromCurrentPixelToBubblePosition >= bubble.bubbleRadius - BUBBLE_LINE_WIDTH) {
        outputColor = getBorderColor();
        return;
    }

    float blickRadius = bubble.bubbleRadius * 4.0 / 5.0;

    // подкрашиваем блик
    bool isPixelInsideBlick = distanceFromCurrentPixelToBubblePosition < blickRadius && distanceFromCurrentPixelToBubblePosition >= blickRadius - BUBBLE_LINE_WIDTH;

    if (isPixelInsideBlick) {
        vec2 normalizedVectorFromCenterBubbleToLeft = normalize(fromCurrentPixelToBubblePosition);
        vec2 normalizedCurrentBubblePosition = normalize(vec2(0.0, 1.0) - vec2(1.0, 0.0));

        float degree = acos(dot(normalizedVectorFromCenterBubbleToLeft, normalizedCurrentBubblePosition)) * 180.0 / PI;

        if (degree < 15.0) {
            outputColor = getBorderColor();
            return;
        }
    }

    shift = (bubble.bubblePosition - vUv) * (1.0 - sqrt(distanceFromCurrentPixelToBubblePosition / bubble.bubbleRadius));

    outputColor = texture2D(map, vUv + shift);
}

void main() {
    vec4 outputColor = texture2D(map, vUv);

    if (hasBubbles == true) {
        drawBubble(outputColor, bubble1);
        drawBubble(outputColor, bubble2);
        drawBubble(outputColor, bubble3);
    }

    // исходники тут
    // @see: https://forum.unity.com/threads/hue-saturation-brightness-contrast-shader.260649/
    outputColor.rgb = applyHue(outputColor.rgb);

    gl_FragColor = outputColor;
}
