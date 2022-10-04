
export default function IconModel(props) {
    const options = props.options;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            width={options.width}
            height={options.width}
            fill={options.fill}

            {...props}
        >
            <path d = {options.path}  />
        </svg>
    )

}

