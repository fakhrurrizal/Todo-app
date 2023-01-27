import React from 'react'
import { Alert, AlertIcon } from '@chakra-ui/react'

function PopupError() {
  return (
    <div className='relative'>

        <Alert status='error' className='rounded-lg absolute top-0' >
            <AlertIcon />
            Data uploaded to the server. Fire on!
        </Alert>
    </div>
  )
}

export default PopupError