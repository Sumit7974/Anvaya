function Success({ type, onContinue }) {
  return (
    <div className="success-page">
      <h1>✓ Success!</h1>

      <p>
        {type === "login"
          ? "You have signed in successfully."
          : "Your account has been created successfully."}
      </p>

      <button onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}

export default Success;