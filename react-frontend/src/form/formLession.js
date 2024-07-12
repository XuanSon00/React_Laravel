import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import './formSubject.css';

const FormLession = ({ onClose, onSubmit, selectedSubject }) => {
    //const [lession, setLession] = useState('');
    const [lessions, setLessions] = useState(selectedSubject && selectedSubject.lessions ? selectedSubject.lessions : [{ lession: '' }]);

    useEffect(() => {
        if (selectedSubject) {
            setLessions(selectedSubject.lessions || [{ lession: '' }]);
        }
    }, [selectedSubject]);    
    
    const handleChange = (index, value) => {
        const newLessions = [...lessions];
        newLessions[index].lession = value;
        setLessions(newLessions);
    };

    const handleAddInput = () => {
        setLessions([...lessions, { lession: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(lessions);
    };

    return (
        <div className='form_detail'>
            <div className='burForm' onClick={onClose}></div>
            <div className='container'>
                <button className='close_btn' onClick={onClose}><CloseIcon /></button>
                <h2>{selectedSubject && selectedSubject.lessions && selectedSubject.lessions.length > 0 && selectedSubject.lessions[0].id ? 'Sửa Bài học' : 'Thêm Bài học'}</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='input_lession'>
                        <div className='add-lession'>
                            <p>{selectedSubject?.name}</p>
                            <AddIcon onClick={handleAddInput}/>
                        </div>
                        <p>Lớp {selectedSubject?.grade}</p>
                    </div>
                    {lessions.map((item, index) => (
                        <div key={index} className='input_name'>
                            <input type='text' value={item.lession} onChange={(e) => handleChange(index, e.target.value)} placeholder='Nhập bài học...' />
                        </div>
                    ))}
                    <div className='btn_add'>
                        <button className='confirmAdd' type='submit'>
                            {selectedSubject?.lessions[0].id ? 'Sửa' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormLession;
