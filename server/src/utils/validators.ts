export const validateRegister = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    const errors: Record<string, string> = {};

    if (!username) errors.username = "Username is required";
    else if (username.length < 3)
        errors.username = "Username must be longer than three characters";
    else if (username.length > 25)
        errors.username = "Username must be shorter than 25 characters";

    if (!email || !validateEmail(email))
        errors.email = "Please provide a valid email";

    if (!password) errors.password = "Password is required";
    if (password.length < 8)
        errors.password = "Password must be longer than eight characters";
    if (password !== confirmPassword)
        errors.confirmPassword = "Passwords must match";

    return errors;
};

export const validateEmail = (email: string) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
