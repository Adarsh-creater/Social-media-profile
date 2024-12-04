import React from 'react'
import Achievement from './Achievement'

import Education from './Education'
import Experience from './Experience'
import Skill from './Skill'


const UserDetail = (props) => {
    return (
        <div>
            <Education role = {props.role}/>
            <Achievement role = {props.role}/>
            <Experience role = {props.role}/>
            <Skill role = {props.role} />
        </div>
    )
}

export default UserDetail
