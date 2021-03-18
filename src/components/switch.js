const Switch = (props) => ( 
    <div className='switch-wrapper'>
        <label 
          className='switch-label'
          for={props.id}
        />
        {props.label}
        { props.disabled
        ? <input 
            type='checkbox'
            className='switch'        
            id={props.id}
            disabled
            onChange={props.handleChange}
        />
        : <input
            type='checkbox'
            className='switch'
            id={props.id}
            onChange={props.handleChange}
          />
        }      
    </div>
);

export default Switch