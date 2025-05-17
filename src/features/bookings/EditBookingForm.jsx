import { Form, Input, DatePicker, Select, Button } from "antd";
import { useBooking } from "./useBooking";
import dayjs from "dayjs";
import Spinner from "../../ui/Spinner";
import useEditBooking from "./useEditeBooking";

function EditBookingForm({ bookingId, onClose }) {
    const [form] = Form.useForm();
    const { booking, isLoading } = useBooking(bookingId);
    const { editBooking, isEditing } = useEditBooking();

    if (!booking || isLoading) return <Spinner />;

    const {
        cabins,
        guests,
        startDate,
        endDate,
        status,
        totalPrice,
        numNights,
        numGuests,
    } = booking;

    const initialValues = {
        startDate: startDate ? dayjs(startDate) : null,
        endDate: endDate ? dayjs(endDate) : null,
        status: status || "",
        totalPrice: totalPrice || "",
        numNights: numNights || "",
        numGuests: numGuests || "",
    };

    function handleEditBooking(values) {
        const payload = {
            startDate: values.startDate ? values.startDate.toISOString() : null,
            endDate: values.endDate ? values.endDate.toISOString() : null,
            status: values.status,
            totalPrice: Number(values.totalPrice),
            numNights: Number(values.numNights),
            numGuests: Number(values.numGuests),
        };
        editBooking(
            { newBookingDate: payload, id: bookingId },
            {
                onSuccess: () => {
                    onClose?.();
                    form.resetFields();
                },
            },
        );
    }

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 400 }}
            initialValues={initialValues}
            onFinish={handleEditBooking}
        >
            <Form.Item label="Cabin Name" >
                <Input value={cabins?.name} disabled />
            </Form.Item>
            <Form.Item label="Guest Name">
                <Input value={guests?.fullName} disabled />
            </Form.Item>
            <Form.Item label="Guest Email">
                <Input value={guests?.email} disabled />
            </Form.Item>

            <Form.Item label="Number of Nights" name="numNights" rules={[{ required: true, message: "Please input number of nights!" }]}>
                <Input type="number" min={1} />
            </Form.Item>
            <Form.Item label="Number of Guests" name="numGuests" rules={[{ required: true, message: "Please input number of guests!" }]}>
                <Input type="number" min={1} />
            </Form.Item>
            <Form.Item label="Total Price" name="totalPrice" rules={[{ required: true, message: "Please input the total price!" }]}>
                <Input type="number" min={0} />
            </Form.Item>
            <Form.Item label="Check In" name="startDate" rules={[{ required: true, message: "Please select check-in date!" }]}>
                <DatePicker style={{ width: "100%" }} getPopupContainer={trigger => trigger.parentNode} />
            </Form.Item>
            <Form.Item label="Check Out" name="endDate" rules={[{ required: true, message: "Please select check-out date!" }]}>
                <DatePicker style={{ width: "100%" }} getPopupContainer={trigger => trigger.parentNode} />
            </Form.Item>
            <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select status!" }]}>
                <Select placeholder="Select status" getPopupContainer={trigger => trigger.parentNode}>
                    <Select.Option value="unconfirmed">Unconfirmed</Select.Option>
                    <Select.Option value="checked-in">Checked In</Select.Option>
                    <Select.Option value="checked-out">Checked Out</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isEditing} style={{ marginRight: 8 }}>
                    Save
                </Button>
                <Button htmlType="button" onClick={() => onClose?.()}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
}

export default EditBookingForm;
