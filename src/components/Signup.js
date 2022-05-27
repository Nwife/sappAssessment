import { useState } from 'react';
import { Link } from 'react-router-dom';

//styles & images
import './Signup.css';
import mail from '../assets/mail.svg';
import eye from '../assets/eye.svg';
import noeye from '../assets/noeye.svg';
import person from '../assets/person.svg';

//components
import Sidebar from './Sidebar';
import PasswordRequirement from './PasswordRequirement';


export default function Signup() {
    //submission states
    const [email, setEmail] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    //form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassWord] = useState(''); //first password
    const [confirmPassword, setConfirmPassWord] = useState(''); //second password
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    // booleans for password validations
    const [containsUL, setContainsUL] = useState(false) // uppercase letter
    const [containsN, setContainsN] = useState(false) // number
    const [containsSC, setContainsSC] = useState(false) // special character
    const [passwordMatch, setPasswordMatch] = useState(false) // passwords match

    // labels and state boolean corresponding to each validation
    const requirements = [
        ["Contains at least one uppercase letter", containsUL],
        ["Contains at least one special character", containsSC],
        ["Contains at least one number", containsN],
        ["Passwords are matching", passwordMatch]
    ];

    const validatePassword = () => {
        // has uppercase letter
        if (password.toLowerCase() !== password) setContainsUL(true)
        else setContainsUL(false)
        // has number
        if (/\d/.test(password)) setContainsN(true)
        else setContainsN(false)
        // has special character
        if (/[~`!#$/@%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(password)) setContainsSC(true)
        else setContainsSC(false)
        // passwords match
        if (password !== "" && password === confirmPassword) setPasswordMatch(true)
        else setPasswordMatch(false)
      }
    
      console.log('©️@',process.env.REACT_APP_CREATE)
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(!passwordMatch || !containsSC || !containsN || !containsUL){ //password validation
            setData(null)
            setError('Password requirements not met')
            return
        }
        setData(null); //clears previous data value
        setIsPending(true); //sets the pending state

        try {
            let res = await fetch('https://moni-typescript-test.herokuapp.com/api/user/create', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                first_name: firstName,
                last_name: firstName,
                email: email,
                password: password,
              }),
            });
            let resJson = await res.json();
            if (resJson.statusCode === 200) {
              setData(resJson.data);
              setIsPending(false);
              setError(null);
             
            } else if(resJson.statusCode === 400) {
              setError(resJson.message);
              setIsPending(false);
            }
          } catch (err) {
            setError('No server response, check your internet connection');
            setIsPending(false);
          }
      }

      console.log('data>>>',data)
      console.log('error>>>', error)

    return (
    <div className='signup'>
        <Sidebar text='Welcome Aboard' />
        <div className="signup__form">
        <form className='form' onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            {error && <p className="error">{error}</p>}
            {data && <p className='success'>Sign up successful</p>}
            <div className="signup__name">
                <label>
                    <span>First Name</span>
                    <div className="input__container">
                    <input
                        type="text"
                        placeholder='John'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />
                    <img className='form__img' src={person} alt="" />
                    </div>
                </label>
                <label>
                    <span>Last Name</span>
                    <div className="input__container">
                    <input
                        type="text"
                        placeholder='Doe'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />
                    <img className='form__img' src={person} alt="" />
                    </div>
                </label>
            </div>
            <label>
                <span>Email</span>
                <div className="input__container">
                <input
                    type="text"
                    placeholder='johndoe@gmail.com'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <img className='form__img' src={mail} alt="" />
                </div>
            </label>
            <div className="signup__password">
                <label>
                    <span>Password</span>
                    <div className="input__container">
                    <input
                        type={passwordShown ? 'text' : 'password'}
                        onChange={(e) => setPassWord(e.target.value)}
                        value={password}
                        onKeyUp={validatePassword}
                        required
                    />
                    <img
                    src={passwordShown ? noeye : eye} alt=""
                    className='form__img' 
                    onClick={() => setPasswordShown(!passwordShown)}
                    />
                    </div>
                </label>
                <label>
                    <span>Confirm Password</span>
                    <div className="input__container">
                    <input
                        type={confirmPasswordShown ? 'text' : 'password'}
                        onChange={(e) => setConfirmPassWord(e.target.value)}
                        value={confirmPassword}
                        onKeyUp={validatePassword}
                        required
                    />
                    <img
                    src={confirmPasswordShown ? noeye : eye} alt=""
                    className='form__img' 
                    onClick={() => setConfirmPasswordShown(!confirmPasswordShown)}
                    />
                    </div>
                </label>
            </div>
            <div className="signup__password-requirements">
                {requirements.map((data, index) => <PasswordRequirement key={index} data={data} />)}
            </div>
            {!isPending && <button>Sign Up</button>}
            {isPending && <button>Signing Up...</button>}
            <p className='action'>Aleady a member? <span><Link to='/'>Sign In</Link></span></p>
            </form>
        </div>
    </div>
  )
}
