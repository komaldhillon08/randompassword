import { useCallback, useEffect, useRef, useState } from 'react'

export function RandomPassword() {
    const [length , setLength] = useState(8)
    const [numberAllowed , setNumberAllowed] = useState(false)
    const [charAllowed , setCharAllowed] = useState(false)
    const [password , setPassword] = useState("")
    // useref hook
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback( () => {
    // random password
    let pass = "" 
    // password chose this line 
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789" 
    if(numberAllowed) str += "!@$%^&*"
    
    // loop 
    for (let i = 1; i <= length; i++) {
        // const element = array[i];
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
        
    }
    setPassword(pass)

    } ,  [length , numberAllowed , charAllowed , setPassword])

// useref
    const copyPassword = useCallback( () => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0 , 20)
    window.navigator.clipboard.writeText(password)
    } , [password] ) 

    useEffect( () => {
    passwordGenerator()
    } , [length, numberAllowed, charAllowed, passwordGenerator] )
        return (
            <>
            <div className="text-orange-500 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-700">
            <h1 className='text-white text-center my-5 mb-5'> Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
                type="text"
                value={password}
                className='w-full py-1 px-3 outline-none bg-white'
                placeholder='Password'
                readOnly
                ref={passwordRef}
            />
            <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'><a href="#">Copy</a></button>
            </div>

            <div className='flex justify-between text-sm gap-x-1 text-orange-500'>
            <div className='flex items-center gap-x-1'>
                <input 
                type="range"
                min={6}
                max={18}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {setLength(e.target.value)}}
                />
                <label>length {length}</label>
            </div>
            <div className='flex text-sm gap-x-1 text-orange-500'>
                <div className='flex items-center gap-x-1'>
                <input 
                    type="checkbox"
                
                    defaultChecked={numberAllowed}
                    id='numberinput'
                    className='cursor-pointer'
                    onChange={() => {setNumberAllowed((prev) => !prev)}}
                />
                <label>number</label>
                </div>
            </div>
            
            <div className='flex text-sm gap-x-1 text-orange-500'>
                <div className='flex items-center gap-x-1'>
                <input 
                    type="checkbox"
                
                    defaultChecked={charAllowed}
                    id='numberinput'
                    className='cursor-pointer'
                    onChange={() => {setCharAllowed((prev) => !prev)}}
                />
                <label>characters</label>
                </div>
            </div>
        </div>
              </div> 
            </>
        )
}