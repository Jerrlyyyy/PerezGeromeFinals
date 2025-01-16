import React, { useEffect, useState } from 'react';
import './ProgramHead.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProgramHeadPage = () => {
    const [programHeadData, setProgramHeadData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Retrieve program_head_id from localStorage
    const program_head_id = localStorage.getItem('program_head_id');

    useEffect(() => {
        if (!program_head_id) {
            setError("Program Dean is not logged in.");
            setLoading(false);
            return;
        }

        // Fetch Program Head-specific data after login
        axios
            .get('http://localhost:8081/programhead/details', {
                params: { program_head_id: program_head_id },
            })
            .then((res) => {
                setProgramHeadData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching Program Head data:", err);
                setError("Failed to load Program Head details.");
                setLoading(false);
            });
    }, [program_head_id]);

    const handleExit = () => {
        localStorage.removeItem('program_head_id');
        navigate('/');
    };

    return (
        <div className="ProgramHeadPage-mainbox">
            <div className="ProgramHeadPage-sidebar">
                <div className="ProgramHeadPage-logo">
                    <div className="ProgramHeadPage-seamslogo"></div>
                    <h2 className="ProgramHeadPage-seams-txt">SEAMS</h2>
                </div>
                <div className="ProgramHeadPage-adminbox">
                    <div className="ProgramHeadPage-adminimage"></div>
                    <h2 className="ProgramHeadPage-adminNameH2">{programHeadData ? programHeadData.program_head_name : "Program Head"}</h2>
                </div>
                <div className="ProgramHeadPage-menu">
                    <button onClick={() => navigate('/event-management')}>Event</button>
                    <button onClick={() => navigate('/course-management')}>Courses</button>
                    <button onClick={() => navigate('/faculty')}>Faculty</button>
                    <button onClick={() => navigate('/reports')}>Reports</button>
                </div>
                <div className="ProgramHeadPage-exit">
                    <button onClick={handleExit}>EXIT</button>
                </div>
            </div>
            <div className="ProgramHeadPage-leftcont-box">
                <h2 className="welcome-program-head">
                    Welcome, {programHeadData ? programHeadData.program_head_name : "Program Head"}!
                </h2>
                {loading && <p>Loading your data...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && (
                    <div className="ProgramHeadPage-eventDetails-box">
                        <h3>Program Overview</h3>
                        <p>Total Courses: {programHeadData?.courseCount ?? 0}</p>
                        <p>Total Faculty: {programHeadData?.facultyCount ?? 0}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgramHeadPage;
