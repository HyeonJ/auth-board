import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div>
            <h1>Auth Board</h1>
            <Routes>
                <Route path="/" element={<p>메인 페이지</p>} />
            </Routes>
        </div>
    );
}

export default App;
