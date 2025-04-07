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
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}>

                {/* options empty bhi ho sakta so checking it first. */}    
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default React.forwardRef(Select)

/* This export is shortcut for Forward Ref as compared to done in Input.jsx */