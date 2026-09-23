package com.zosh.config;

public class JwtConstant {


	// Render/prod me JWT_SECRET env se aayega (Render Dashboard -> Environment me set karo).
	// Local me JWT_SECRET env set karo ya ye fallback use hoga (sirf local testing ke liye).
	// IMPORTANT: prod me JWT_SECRET env jaroor set karna (min 32 chars).
	public static final String SECRET_KEY = initSecret();

	private static String initSecret() {
		String env = System.getenv("JWT_SECRET");
		if (env != null && !env.isBlank()) {
			return env;
		}
		String prop = System.getProperty("jwt.secret");
		if (prop != null && !prop.isBlank()) {
			return prop;
		}
		return "local_only_change_me_to_32_plus_chars_long_secret_key";
	}
	public static final String JWT_HEADER="Authorization";
	
}
