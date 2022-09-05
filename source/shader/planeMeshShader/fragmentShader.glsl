precision mediump float;

uniform sampler2D map;
uniform float delta;

varying vec2 vUv;

vec3 applyHue(vec3 aColor, float aHue)
{
    float angle = radians(aHue);
    vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(angle);
    //Rodrigues' rotation formula
    return aColor * cosAngle + k * aColor * sin(angle) + k * dot(k, aColor) * (1.0 - cosAngle);
}

void main() {
    vec4 texel = texture2D(map, vUv);

    vec4 outputColor = texel;

    // исходники тут
    // @see: https://forum.unity.com/threads/hue-saturation-brightness-contrast-shader.260649/
    outputColor.rgb = applyHue(outputColor.rgb, delta);

    gl_FragColor = outputColor;
}
