pub mod http;

use std::env::VarError;

/// Environment variable interface.
pub trait EnvironmentVariable<T> {
    /// The name of the environment variable.
    const NAME: &'static str;

    /// The default value of the environment variable.
    fn default() -> T;

    /// Get the raw value of the environment variable.
    ///
    /// # Errors
    ///
    /// This function will return an error if the environment variable is not
    /// set.
    fn get_raw() -> Result<String, VarError> {
        const VAR_PREFIX: Option<&str> = option_env!("VAR_PREFIX");
        let prefix = VAR_PREFIX.unwrap_or("APP_");
        std::env::var(format!("{prefix}{}", Self::NAME))
    }

    /// Get the value of the environment variable.
    fn get() -> T {
        Self::get_raw()
            .ok()
            .map_or_else(Self::default, Self::convert)
    }

    fn convert(raw: String) -> T;
}
