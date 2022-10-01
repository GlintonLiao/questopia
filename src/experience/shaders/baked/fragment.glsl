uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
// uniform sampler2D uBakedNeutralTexture;
uniform sampler2D uLightMapTexture;

uniform float uNightMix;
// uniform float uNeutralMix;

uniform vec3 uLightScreenColor;
uniform float uLightScreenStrength;

uniform vec3 uLightLampColor;
uniform float uLightLampStrength;

uniform vec3 uLightShelfColor;
uniform float uLightShelfStrength;

varying vec2 vUv;

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

void main()
{
    vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
    vec3 bakedNightColor = texture2D(uBakedNightTexture, vUv).rgb;
    // vec3 bakedNeutralColor = texture2D(uBakedNeutralTexture, vUv).rgb;
    vec3 bakedColor = mix(bakedDayColor, bakedNightColor, uNightMix);
    vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    float lightScreenStrength = lightMapColor.r * uLightScreenStrength;
    bakedColor = blendLighten(bakedColor, uLightScreenColor, lightScreenStrength);

    float lightShelfStrength = lightMapColor.b * uLightShelfStrength;
    bakedColor = blendLighten(bakedColor, uLightShelfColor, lightShelfStrength);

    float lightLampStrength = lightMapColor.g * uLightLampStrength;
    bakedColor = blendLighten(bakedColor, uLightLampColor, lightLampStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}
