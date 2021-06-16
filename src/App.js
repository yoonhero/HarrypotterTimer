import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { useForm } from 'react-hook-form';
import styled from "styled-components"

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  left:0;
  top:0;
  background-color: inherit;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

`

const Bac = styled.img`
  z-index: -1;
  width: 100vw;
  height: 100vh;
  left:0;
  top:0;
  position: fixed;
`

const BlackBac = styled.div`
z-index: -1;
  width: 100vw;
  height: 100vh;
  left:0;
  top:0;
  position: fixed;
  background-color: #000;
`

const CircleBar = styled.div`
  width: ${props => props.height}px;
  height: ${props => props.height}px;
  border: 6px solid #443F3C;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.span`
  color: #443F3C;
  font-weight: ${props => props.weight};
  font-size: ${props => props.fontsize}px;
  font-family: 'Raleway', sans-serif;
  @media only screen and (max-width: 600px){
  font-size: ${props => props.fontsize * 0.7}px;
  }

`
const Input = styled.input`
border: none;
  padding: 10px 0;
  padding-bottom: 3px;
  outline: none;
  border-bottom: solid 3px #443F3C;
  background: none;
  font-size: 60px;
  text-align: center;
  width: 30%;
  font-family: 'Raleway', sans-serif;
  &::placeholder{
    font-size: 40px;
  }
  @media only screen and (max-width: 600px){
    font-size: 30px;
    &::placeholder{
    font-size: 20px;
  }
  }
`

const Form = styled.form`
width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 40px;
  @media only screen and (max-width: 600px){
    margin-top: 10px;
  margin-bottom: 15px;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content: center;
`

const Btn = styled.button`

  margin-top: 10px; 
  padding: 3px;
  background: inherit;
  border:none;
  svg{
    font-size:20px;
  }
`

const TimerContainer = styled.div`

  width: ${props => props.height}px;
  height: ${props => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 580px){
    width: 100%;
    height: 100%;
  }
`

const TimerText = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 60px;
font-weight: 600;
font-family: 'Roboto', sans-serif;

`




function App() {
  const { register, handleSubmit, getValues, setValues } = useForm()
  const [studyTime, setStudyTime] = useState(0)
  const [breakTime, setBreakTime] = useState(0)
  const [timer, setTimer] = useState(0)
  const [mode, setMode] = useState()  //mode 0 is study 1 is break
  useEffect(() => {
    setTimer(studyTime)
  }, [studyTime])
  const flowtime = () => {
    console.log("timer", timer)
    if (timer > 0) {
      setTimer(timer - 1)
    }
  }
  useEffect(() => {
    if (timer > 0) {
      setTimeout(flowtime, 1000)
    }
    else {
      setMode(mode === 0 ? 1 : 0)
    }

  }, [timer])
  useEffect(() => {
    console.log("mode", mode)
    if (mode === 0) {
      setTimer(studyTime)
    } else if (mode === 1) {
      setTimer(breakTime)
    }
  }, [mode])
  const onValid = () => {
    const { studytime, breaktime } = getValues()
    console.log(studytime, breaktime)
    if (!isNaN(studytime) && !isNaN(breaktime) && studyTime % 1 === 0 && breakTime % 1 === 0) {

      setStudyTime(Math.floor(studytime) * 1)
      setBreakTime(Math.floor(breaktime) * 1)
    }

  }

  return (
    <Main>
      { studyTime === 0 && breakTime === 0 ?
        <Bac src="./paper.png" /> : <BlackBac></BlackBac> }

      { studyTime === 0 && breakTime === 0 ?

        <CircleBar height={ window.innerWidth < 600 ? window.innerWidth * 0.9 : window.innerHeight * 0.7 }>

          <Title weight="400" fontsize="23">Ordinary Wizarding Level</Title>
          <Form onSubmit={ handleSubmit(onValid) }>
            <Column>
              <Input placeholder="study" name="studytime" { ...register('studytime', { required: true }) } />
              <Title weight="500" fontsize="60">/</Title>
              <Input placeholder="break" name="breaktime" { ...register('breaktime', { required: true }) } />
            </Column>

            <Btn type="submit">
              <FontAwesomeIcon icon={ faPlay } />
            </Btn>

          </Form>
          <Title weight="600" fontsize="45">Study Timer</Title>
          <Title weight="400" fontsize="35">for OWL</Title>


        </CircleBar>
        :
        <TimerContainer height={ window.innerWidth < 600 ? window.innerWidth * 0.9 : window.innerHeight * 0.7 } >
          <CircularProgressbarWithChildren maxValue={ mode === 1 ? breakTime : studyTime } value={ timer } strokeWidth={ 2 }
            styles={ buildStyles({
              strokeLinecap: 'butt',
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: `${mode === 0 ? "#5B79A6" : "#57AA99"}`,
              trailColor: '#262826'
            }) }>
            <TimerText style={ { color: "white" } }>
              { mode === 1 ? <span style={ { fontSize: "30px" } }>Break Time!!</span> : null }
              <span>{ timer > 60 ? String(Math.floor(timer / 60)) : "00" }:{ Math.floor(timer % 60) < 10 ? "0" + String(Math.floor(timer % 60)) : String(Math.floor(timer % 60)) }</span>
            </TimerText>
          </CircularProgressbarWithChildren>
        </TimerContainer>
      }
    </Main>
  );
}

export default App;
