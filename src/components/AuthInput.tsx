interface AuthInputPropsType {
    type: "email" | "password"
    name: string
    value: string | undefined
    placeholder: string
    ariaLabel: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    styles?: string
}

const AuthInput = ({type, name, value, placeholder, ariaLabel, onChange, styles=""}: AuthInputPropsType) => {
    return (
        <input 
            type={type}
            name={name}
            value={value}
            placeholder={placeholder} 
            aria-label={ariaLabel}
            onChange={onChange}
            className={`p-[.5vh] text-[1.75vh] border-t-4 border-b-8 border-l-8 border-r-4 border-offblack rounded-xl ${styles}`}
        />
    )
}

export default AuthInput
