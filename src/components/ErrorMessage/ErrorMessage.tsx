import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={css.error}>
      Must be more than 3 characters and no more than 50 characters.
    </p>
  );
};

export default ErrorMessage;
