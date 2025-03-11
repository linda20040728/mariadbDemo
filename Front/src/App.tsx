import './App.css'
import { useEffect, useState } from 'react';
import { asyncGet } from '../utils/fetch';
import { api } from '../enum/api';
import { Reservation } from '../interface/Reservation'

function App() {
  const [reservation, setReservation] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await asyncGet(api.getAllReservations);
      if (response) {
        setReservation(response.data);
      }
      else {
        console.log("Failed to fetch reservations");
      }
      setLoading(false);
    } catch (error) {
      console.log(`Server error: ${error}`);
      setLoading(false);
    }
  }

  const formatDateTime = (dateTimeStr: string): string => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchReservations();
  }, [])

  return (
    <div className="container">
      <h1 className="title">預約紀錄</h1>
      
      {loading ? (
        <div className="loading-message">載入中...</div>
      ) : reservation && reservation.length > 0 ? (
        <div className="table-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>預約 ID</th>
                <th>學號</th>
                <th>學生姓名</th>
                <th>排別</th>
                <th>座號</th>
                <th>時段</th>
              </tr>
            </thead>
            <tbody>
              {reservation.map((item) => (
                <tr key={item.reservation_id} className="table-row">
                  <td>{item.reservation_id}</td>
                  <td>
                    {item.student.student_id}
                  </td>
                  <td>                    
                    {item.student.student_name}
                  </td>
                  <td>
                    {item.seat.row_label}
                  </td>
                  <td>
                    {item.seat.seat_number}
                  </td>
                  <td>
                    {item.timeslot.start_time} - {item.timeslot.end_time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-data-message">沒有資料</div>
      )}
    </div>
  )
}

export default App
