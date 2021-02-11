import React, {useState, useEffect } from 'react'
import './styles.scss'
import Modal from '../src/Modal'


 const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(false);
    useEffect(() => {
      for (const validation in validations) {
        switch (validation) {
          case 'minLengthError':
            if (value.length < validations[validation]) {
              setMinLengthError(true);
            } else {
              setMinLengthError(false);
            }
            break;
          case 'isEmpty':
            if (value) {
              setEmpty(false);
            } else {
              setEmpty(true);
            }
            break;
          case 'isEmail':
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(value).toLowerCase())) {
              setEmailError(false);
            } else {
              setEmailError(true);
            }
            break;
          default:
            break;
        }
      }
    }, [value, emailError, isEmpty, validations]);
    useEffect(() => {
      if (isEmpty || minLengthError || emailError) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    }, [isEmpty, minLengthError, emailError]);
    return {
      isEmpty,
      minLengthError,
      emailError,
      inputValid,
    };
  };

  const useInput = (initialValue, validation) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validation)
    const onChange = (e) => {
      setValue(e.target.value)
      setDirty(true)
    }
    const onSubmit = () => {
      setValue('');
    }
    return{
      value,
      onChange,
      ...valid,
      isDirty,
      onSubmit
    }
  }
 
  
const  App = () =>{
    const email = useInput('', { isEmpty: true, minLengthError: 3, isEmail: true });
    const password = useInput('', { isEmpty: true, minLengthError: 5 });
    const [modalActive, setModalActive] = useState(false)
    return (
      <div>
        <div className="app">
          <h1>Sign up</h1>
          {email.isDirty && (email.isEmpty || email.minLengthError || email.emailError) && (
            <div>Wrong e-mail</div>
          )}
          <input
            onChange={(e) => email.onChange(e)}
            value={email.value}
            className="email"
            name="email"
            type="text"
            placeholder="Enter your email..."
          />
          {password.isDirty && (password.isEmpty || password.minLengthError) && (
            <div>Wrong password</div>
          )}
          <input
            onChange={(e) => password.onChange(e)}
            value={password.value}
            className="password"
            name="password"
            type="password"
            placeholder="Enter your password..."
          />
          <button
            onClick={() => setModalActive(true)}
            disabled={!email.inputValid || !password.inputValid}
            className="btn"
            type="submit">
            Submit
          </button>
        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          <h1>Modal window</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis impedit voluptatem
            cumque atque ex totam quisquam aut alias repellendus placeat?
          </p>
          <button onClick={() => setModalActive(false)}>Close</button>
        </Modal>
      </div>
    );
  }
export default App
