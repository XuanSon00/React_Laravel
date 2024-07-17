import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const FormEduType = ({onClose, onSubmit, selectedType }) => {
  const [typeName, setTypeName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(selectedType) {
      setTypeName(selectedType.type);
    }
  }, [selectedType]);

    const validateForm = () => {
      if (!typeName.trim()) {
        return "Vui lòng không để trống!";
      }
      return "";
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }
      try{
        onSubmit({
          type: typeName,
        });
        onClose();
      } catch(error) {
        setError('Có lỗi xảy ra vui lòng thử lại sau');
      }
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
        {error && <div className='error_message' style={{color:'red', marginTop: '20px', textAlign: "center"}}>{error}</div>}
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
