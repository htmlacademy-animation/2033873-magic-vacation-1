precision mediump float;

uniform sampler2D map;
uniform float delta;
uniform vec2 bubblePosition;

varying vec2 vUv;

vec3 applyHue(vec3 aColor, float aHue) {
    float angle = radians(aHue);
    vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(angle);
    //Rodrigues' rotation formula
    return aColor * cosAngle + k * aColor * sin(angle) + k * dot(k, aColor) * (1.0 - cosAngle);
}

float getDistanceFromCurrentPixelToBubblePosition() {
    vec2 currentPosition = vec2(vUv.x * float(IMAGE_ASPECT_RATIO), vUv.y);
    vec2 currentBubblePosition = vec2(bubblePosition.x * float(IMAGE_ASPECT_RATIO), bubblePosition.y);

    return length(currentPosition - currentBubblePosition);
}

vec2 getShift(float distanceFromCurrentPixelToBubblePosition) {
    vec2 shift = vec2(0, 0);

    if (distanceFromCurrentPixelToBubblePosition > BUBBLE_RADIUS) {
        return shift;
    }

    float con = pow(distanceFromCurrentPixelToBubblePosition, 0.3) + 1.0;

    return (bubblePosition - vUv) * (1.0 - sqrt(distanceFromCurrentPixelToBubblePosition / BUBBLE_RADIUS));
}

void drawBubble(inout vec4 outputColor, float distanceFromCurrentPixelToBubblePosition) {
    float gray = 0.8;

    if (distanceFromCurrentPixelToBubblePosition <= BUBBLE_RADIUS && distanceFromCurrentPixelToBubblePosition >= BUBBLE_RADIUS - BUBBLE_LINE_WIDTH) {
        outputColor.rgb = vec3(gray, gray, gray);
    }
}

void main() {
    float distanceFromCurrentPixelToBubblePosition = getDistanceFromCurrentPixelToBubblePosition();
    vec2 shift = getShift(distanceFromCurrentPixelToBubblePosition);

    vec4 texel = texture2D(map, vUv + shift);

    vec4 outputColor = texel;

    // исходники тут
    // @see: https://forum.unity.com/threads/hue-saturation-brightness-contrast-shader.260649/
    outputColor.rgb = applyHue(outputColor.rgb, delta);

    // подкрашиваем контуры пузырька
    drawBubble(outputColor, distanceFromCurrentPixelToBubblePosition);

    gl_FragColor = outputColor;
}
