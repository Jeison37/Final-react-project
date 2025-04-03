export const BillComponent = ({bill, name, email}) => {
    return ( 
        <>
        <div className="invoice">
        
        <div className="invoice-details">
            <p><span>Número de Factura: ${bill._id}</span> </p>
            <p><span>Fecha de Emisión:</span> ${bill.createdAt} </p>
            <p><span>Estado:</span> ${bill.estado} </p>
            <p><span>Método de Pago:</span> ${bill.metodo_pago} </p>
        </div>

        <div className="customer-details">
            <h2>Detalles del Cliente</h2>
            <p><span>Nombre:</span> ${name} </p>
            <p><span>Correo Electrónico:</span> ${email} </p>
        </div>

        <div className="transaction-details">
            <h2>Detalles de la Transacción</h2>
            <p><span>Monto:</span> $${bill.monto}</p>
            <p><span>Descripción:</span> Pago realizado a través de PayPal.</p>
        </div>

        <div className="thank-you">
            <p>Gracias por su compra!</p>
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        </div>
    </div>
        </>
     );
}