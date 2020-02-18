export function validate(field) {
  switch (field.name) {
    case "login":
      return field.value.trim().length > 3 ? null : "Login is too short";
    case "password":
      return field.value.trim().length > 6
        ? field.value.match(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/
          )
          ? null
          : "Password must contains minimum one number, lowercase letter, uppercase letter"
        : "Password must be at least 6 characters long";
    default:
      return null;
  }
}
