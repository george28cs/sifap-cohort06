/* eslint-disable react/prop-types */
import React from 'react';

import Modal from '../Modal';
import '../../assets/styles/utils/ConfirmateModal.scss'

const RoleDeleteModal = (props) => {


   const {
      handleModalClose,
      modalIsOpen,
   } = props;

   return (
      <Modal
         isOpen={modalIsOpen}
         isConfirmation
      >
         <button type='button' onClick={handleModalClose}>X</button>
         <p>
            ¿Estás seguro que deseas eliminar este usuario?
         </p>
         <div>
            <button type='button' onClick={handleModalClose}>Cancelar</button>
            <button type='button' onClick={handleModalClose}>Aceptar</button>
         </div>
      </Modal>
   )
};

export default RoleDeleteModal;