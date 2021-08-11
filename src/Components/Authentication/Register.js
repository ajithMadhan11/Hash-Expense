import React from 'react';
import styled from 'styled-components'
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom'

const MainContainer = styled.div`
background-color: #ffffff;
width: 100%;
height:100vh;
color: black;
padding: 30px;
overflow-y: hidden;
display:flex;
@media (max-width: 768px) {
    padding: 5px;
  }
`
const SideComponent = styled.div`
height: 80vh;
width: 35%;
background: #FFFFFF;
box-shadow: 4px 5px 32px -10px rgba(0, 0, 0, 0.25);
border-radius: 32px;
padding: 30px;
@media (max-width: 768px) {
    display:none;
  }
`
const LoginComponent = styled.div`
background: #FFFFFF;
padding: 20px;
width: 60%;
margin: 0px 100px 40px 100px;
@media (max-width: 768px) {
   margin:0px;
   width:100%;
   padding:10px;
  }

`
const SideComponentTitle  = styled.p`
font-weight:400;
font-size: 30px;
margin-top: 45px;
margin-left: 5px;
padding: 10px;
@media (max-width: 768px) {
margin-top: 15px;
margin-left: 15px;
font-size: 50px;
}
`
const LoginImg = styled.img.attrs({
    src: 'https://minimals.cc/static/illustrations/illustration_register.png'
})`
width: 400px;
height: 300px;
margin-top: 55px;
`

const Stitile  = styled.p`
font-weight:400;
font-size: 30px;
margin-top: 45px;
margin-left: 35px;

`
const Stitiletwo  = styled.p`
font-weight:200;
font-size: 20px;
margin-top: 15px;
margin-left: 35px;

`
const SocialLoginconatainer = styled.div`
margin-top: 35px;
margin-left: 35px;
display:flex;
@media (max-width: 768px) {
    flex-direction: column;

}

`
const SocialSignin = styled.div`
width: 224px;
height: 56px;
background: #FFFFFF;
border: 1px solid #B0B0B0;
box-sizing: border-box;
border-radius: 18px;
padding: 10px;
display: flex;
align-items:center ;
justify-content: space-around;
font-weight:600;
margin-right:20px;

&:hover{
    background: #ececec;
    cursor:pointer;
}
@media (max-width: 768px) {
width: 300px;
    margin-top: 10px;
justify-content: space-evenly;

}
`
const Divider = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  margin-left: 35px;
  margin-Right: 170px;
  margin-top: 15px;

  &::before{
    content: '';
  height: .015em;
  background: grey;
  flex: 1;
  margin: 0 .25em 0 0;
  }
  &::after{
    content: '';
  height: .015em;
  background: grey;
  flex: 1;
  margin: 0 0 0 .25em;
  }
  @media (max-width: 768px) {
    width: 300px;
    margin-top: 10px;
}
`
const Forgetbtn  = styled.p`
font-weight:400;
font-size: 15px;
margin-top: 20px;
margin-left: 340px;
color:#27B05A;
&:hover{
    cursor:pointer;
}
@media (max-width: 768px) {
    margin-left: 190px;
}
`
const SignUpBtn  = styled.p`
font-size: 15px;
font-weight:400;
margin-top:20px;
margin-left: 35px;
`
const SignupBtnText = styled.p`
font-weight:400;
font-size: 15px;
margin-top:20px;

color:#27B05A;
&:hover{
    cursor:pointer;
}
`
const SubmitBtn = styled.button`
  font-size:15px;
    border-radius: 14px;
    width: 460px;
    height:45px;
    padding:15px;
    margin-top:20px;
    background-color: #27B05A;
    color:#ffffff;
    border:none;
    &:hover{
        cursor:pointer;
        background-color:#1E9A4C;
    }
    @media (max-width: 768px) {
        width: 300px;
        padding:10px
}
`

const FormContainer = styled.div`

margin-top: 5px;
margin-left: 35px;
`
const FormContainerTwo = styled.div`
display: flex;
margin-top: 15px;
margin-left: 35px;
@media (max-width: 768px) {
flex-direction: column;

}
`
const InputTwo = styled.input.attrs(props => ({
    type: props.type
    
  }))`
  font-size:15px;
    border: 1px solid grey;
    border-radius: 14px;
    width: 215px;
    height:40px;
    padding:5px;
    margin-top:10px;
    margin-right:10px;
    &:focus{
        outline: none;
    border-radius: 14px;
    border: 2px solid #27B05A;
    }
    @media (max-width: 768px) {
        width: 280px;
        padding:10px
}
  `;

const Input = styled.input.attrs(props => ({
    type: props.type
    
  }))`
  font-size:15px;
    border: 1px solid grey;
    border-radius: 14px;
    width: 450px;
    height:40px;
    padding:5px;
    margin-top:10px;
    &:focus{
        outline: none;
    border-radius: 14px;
    border: 2px solid #27B05A;
    }
    @media (max-width: 768px) {
        width: 280px;
        padding:10px
}
  `;
const LastConatainer = styled.div`
display:flex;

`
const FireBaseLogo=styled.div`
position: absolute;
top:100;
right:30px;
@media (max-width: 768px) {
        display:none;
}
`

const Register = () => {
    return (
        <MainContainer>

           <SideComponent>
               <SideComponentTitle>Manage your expense more effectively using Hash Expense</SideComponentTitle>
                <LoginImg></LoginImg>
           </SideComponent>

           <LoginComponent>
                <Stitile>Get started absolutely free. </Stitile>
                <Stitiletwo>Free forever no credit card needed.</Stitiletwo>
                <SocialLoginconatainer>
                    <SocialSignin><Icon icon="flat-color-icons:google" width="32" height="32"/> Signup with Google</SocialSignin>
                    <SocialSignin><Icon icon="la:facebook-f" color="#4267b2" width="32" height="32" /> Signup with Facebook</SocialSignin>
                </SocialLoginconatainer>
                <Divider>OR</Divider>
                <FormContainerTwo>
                   <InputTwo type={"text"} placeholder="Enter your Name"/>
                   <InputTwo type={"number"}placeholder="Enter your Phone number"/>
                </FormContainerTwo>
                <FormContainer>
                   <Input type={"text"} placeholder="Enter your Email"/>
                   <Input type={"password"}placeholder="Enter your Password"/>
                  
                   <SubmitBtn>Signin</SubmitBtn>
                </FormContainer>
                <LastConatainer> <SignUpBtn>Already have a account?
                </SignUpBtn>
                <SignupBtnText><Link style={{ textDecoration: 'none',backgroundColor:"#ffffff",color:"#27B05A" }} to="/signin"> &nbsp;SignIn</Link></SignupBtnText>
                </LastConatainer>
               
            
           </LoginComponent>
           <FireBaseLogo>
           <Icon icon="logos:firebase" color="#4267b2" width="56" height="56" />
           </FireBaseLogo>
        </MainContainer>
    );
}

export default Register;
