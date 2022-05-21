

export default function FloatingLabelInput(props) {

    return (
        <div className="form-floating mb-3">
            <input type={props.type} className="form-control border-0 border-bottom rounded-0" placeholder={props.placeholder}
                   id={props.controlId} name={props.name} />
            <label htmlFor={props.controlId} className="form-label">{props.label}</label>
        </div>
    );
}
