import "./Loading.scss"


import { Spinner } from "react-bootstrap"

export default function Loading() {
	return (
		<div className="loading">
			<Spinner 
				animation="border"
				role="status"
			/>

			<h5>Cargando...</h5>
		</div>
	)
}