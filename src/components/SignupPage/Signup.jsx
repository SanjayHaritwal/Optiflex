import axios from "axios";
import styles from "./Signup.module.css";
import {useState} from "react";
import styled from "styled-components";
import PasswordTab from "./PasswordTab";
import {Link} from "react-router-dom";

export default function Signup(){
    var pattern = /^[^ ]+@[^]+\.[a-z]{2,3}$/;
    const [email, setEmail] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false)
    const [user, setUser] = useState(false);
    const [button, setButton] = useState(false);
    const [detail, setDetail] = useState({
        email:"",
        username:"",
        password:""
    });
    
    const Button = styled.button`
        height:4.5rem;
        width: 13.7rem;
        background-color:${button?"#007C89":"white"};
        border: 1px solid ${button?"#007C89":"#BDBBB9"};
        color: ${button?"#FFFFFF":"#BDBBB9"};
        font-size: 1.6rem;
        letter-spacing: -3%;
        font-weight: 500;
        cursor: pointer;
    `;

    const CheckBox = styled.input`
        height: 2.2rem;
        width: 2.3rem;
        border: 1px solid #BDBBB9;
        border-radius: 0.2rem;
        margin: 0rem 1rem 0rem 4.3rem;
    `;

    const handleEmail= (e)=>{
        if(e.target.value.match(pattern)|| e.target.value===""){
            setEmail(false);
            e.target.style.outlineColor = '#007C89 !important';
        } else {
            setEmail(true);
            e.target.style.outlineColor = '#F25F25 !important';
        }
        setDetail({...detail, [e.target.name]:e.target.value})
    }

    const handleUser = (e)=>{
        setDetail({...detail, [e.target.name]:e.target.value})
    }

    const submitData = (e)=>{
        e.preventDefault();
        try{
            axios.post("http://localhost:3001/create", detail);
        } catch(err){
            console.log(err);
        }
        localStorage.setItem("user",JSON.stringify(detail))
    }

    return (
        <div className={styles.signup}>
            <img src="/images/chimpLogo.svg" alt="" />
            <div className={styles.signupComponent}>
                <h3 className={styles.h3}>Welcome to OptiFlex</h3>
                <p></p>
                <div className={styles.formS}>
                    <div>
                        <p>Email</p>
                        <input type="email" name="email" value={detail.email} onChange={handleEmail} />
                        <br />
                        {email?<span>Please enter a valid email</span>:<></>}
                    </div>
                    <div>
                        <p>Username</p>
                        <input type="text" name="username" value={detail.username} onChange={handleUser} onClick={()=>setUsername(true)} onBlur={()=>setUsername(false)}/>
                        <br />
                        {username ? <h5 className={styles.h5}>.</h5>:
                        user?<span></span>:<></>}
                    </div>
                    <PasswordTab password={password} setPassword={setPassword} setButton={setButton} detail={detail} setDetail={setDetail}/>
                    <Button className={styles.signupBtn} onClick={submitData} type="submit"><Link to="/dashboard" >Sign Up</Link></Button>
                    <CheckBox type="checkbox" />
                    <p></p>
                </div>
                <p> <span></span>.</p>
                <p></p>
            </div>
            <img className={styles.image} src="/images/signup.png" alt="" />
        </div>
    )
}
