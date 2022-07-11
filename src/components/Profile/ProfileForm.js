import { useRef, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;

  const [isLoading, setIsLoading] = useState(false);

  const newPasswordInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation

    setIsLoading(true);

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyASensa2kcDyfO8fTPaBITTrH6WWXPaUZE',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
            password: enteredNewPassword,
            returnSecureToken: false,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      alert('Successfully changed password');
    } catch (error) {
      alert(error || 'Change Password Failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength='7'
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        {!isLoading && <button>Change Password</button>}
        {isLoading && <p>Loading...</p>}
      </div>
    </form>
  );
};

export default ProfileForm;
