import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const FormEduType = ({onClose, onSubmit, selectedType }) => {
    const [typeName, setTypeName] = useState('');

    useEffect(() => {
        if(selectedType) {
            setTypeName(selectedType.type);
        }
    }, [selectedType]);
      
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
          type: typeName,
        });
        onClose();
    };
return (
<>
  <div className='form_detail_role'>
    <div className='burForm' onClick={onClose}></div>
    <div className='container'>
      <button className='close_btn' onClick={onClose}><CloseIcon /></button>
      <h2>{selectedType ? 'Sửa' : 'Thêm'} Loại hình giáo dục</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input_name'>
          <label htmlFor='name' className='label'>Loại hình giáo dục: </label>
          <input type='text' name='name' className='input' value={typeName} onChange={(e) => setTypeName(e.target.value)} required />
        </div>
        <div className='btn_add'>
          <button className='confirmAdd' type='submit'>{selectedType ? 'Sửa' : 'Thêm'}</button>
        </div>
      </form>
    </div>
  </div>
</>
)
}

export default FormEduType
