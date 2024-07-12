import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import './subject.css';
import { getSubjects, } from '../../api/subject';
import FormLession from '../../form/formLession';
import { createLession, updateLession } from '../../api/lession';
const Lession = () => {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [AddForm, setAddForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadSubjects = async () => {
        try {
            const response = await getSubjects();
            //console.log('Dữ liệu nhận từ API:', response);
            setSubjects(response);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách môn học:', error);
            setSubjects([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubjects();
    }, []);

    const handleAddLession = (subject) => {
        setSelectedSubject({ ...subject, lessions: [{ lession: '' }] });
        setAddForm(true);
    };

    const handleEditLession = (subject) => {
        if (subject.lessions && subject.lessions.length > 0) {
            setSelectedSubject({ ...subject, lessions: subject.lessions });
        } else {
            setSelectedSubject({ ...subject, lessions: [{ lession: '' }] });
        }
        setAddForm(true);
    };
    
    
    


    const handleFormSubmit = async (lessions) => {
        if (selectedSubject && selectedSubject.lessions[0].id) {
            await updateLession({ id: selectedSubject.id, lessions });
        } else {
            for (const item of lessions) {
                await createLession({ idSubject: selectedSubject.id, lession: item.lession });
            }
        }
        setAddForm(false);
        loadSubjects();
    };


    const handleFormClose = () => {
        setSelectedSubject(null);
        setAddForm(false);
    };

    const columns = [
        {
            name: '',
            selector: row => <input type='checkbox' className="btncheck" onChange={() => handleCheckboxChange(row.id)} />,
            sortable: false,
        },
        {
            name: 'Tên Môn học',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Lớp',
            selector: row => row.grade,
            sortable: true,
        },
        {
            name: '',
            cell: row => (
                <>
                    <button className='editForm' onClick={() => handleAddLession(row)}>Thêm</button>
                    <button className='editForm' onClick={() => handleEditLession(row)}>Sửa</button>
                </>
            ),
            sortable: false,
        },
    ];

    const handleCheckboxChange = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.grade.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const handleFilterChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            {AddForm &&
                <FormLession
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                    selectedSubject={selectedSubject}
                />
            }
            <div className='subject'>
                <div className='subjectData'>
                    <h3>Bài học</h3>
                    <div className='data'>
                        <div className='btnData'>
                            <div className='subjectAdd'></div>
                            <div className='searchBox'>
                                <input type='text' value={searchTerm} onChange={handleFilterChange} placeholder='Tìm kiếm môn học...' />
                            </div>
                            <div className='subjectDelete'>
                            </div>
                        </div>
                        <div className='table'>
                            <DataTable
                                className='tableData'
                                columns={columns}
                                data={filteredSubjects}
                                pagination
                                paginationPerPage={10}
                                progressPending={loading}
                                fixedHeader
                                highlightOnHover
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Lession;
