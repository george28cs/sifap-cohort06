import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';



import '../assets/styles/components/Modal.scss';

const Modal = (props) => {

   const { children, isOpen, isModalAddRole, isConfirmation } = props;

   const modalClass = classNames('Modal', {
      isModalAddRole,
      isConfirmation
   })

   if(!isOpen) {
      return null
   }
   return(
      ReactDOM.createPortal(
         <div className='Modal__overlay'>
            <div className={modalClass} id='modal'>
               {children}
            </div>
         </div>,
         document.getElementById('modal')
      )
   );
}
export default Modal;
