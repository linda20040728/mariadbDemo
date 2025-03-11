export interface Reservation {
    reservation_id: number
    student: {
        student_id: number
        student_name: string
    },
    seat: {
        seat_id: number
        row_label: string
        seat_number: number
    },
    timeslot: {
        timeslot_id: number
        start_time: string
        end_time: string
    },
    create_time: string
}