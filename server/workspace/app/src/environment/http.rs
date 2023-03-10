use super::EnvironmentVariable;

/// HTTP Binding the server should listen on.
pub struct Bindings;
impl EnvironmentVariable<String> for Bindings {
    const NAME: &'static str = "HTTP_LISTEN";

    fn default() -> String {
        "0.0.0.0:8080".to_string()
    }

    fn convert(raw: String) -> String {
        raw
    }
}
