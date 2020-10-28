import React from 'react'
import FreshChat from 'react-freshchat'

export default() =>{

    return(
        <div>
             <FreshChat
                    token= "894ff5b3-fc54-41ed-b74d-beef493b9043"
                    host= "https://wchat.freshchat.com"
                    onInit={widget => {
                    /* Use `widget` instead of `window.fcWidget`
                        widget.user.setProperties({
                        email: user.email,
                        first_name: user.firstName,
                        last_name: user.lastName,
                        phone: user.phoneNumber,
                        })
                    */
                    }}
                />
        </div>
    )
}