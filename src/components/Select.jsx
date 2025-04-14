import React, { useId } from 'react'

// options ek array hai..
function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select {...props} id={id} ref={ref}
                className={`px-3 py-2 rounded-lg outline text-white focus:bg-black-50 focus:outline-2 focus:outline-white duration-100 border-white w-full ${className}`}>

                {/* options empty bhi ho sakta so checking it first. */}    
                {options?.map((option) => (
                    <option key={option} value={option} className="bg-black outline-2">
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default React.forwardRef(Select)

/* This export is shortcut for Forward Ref as compared to done in Input.jsx */