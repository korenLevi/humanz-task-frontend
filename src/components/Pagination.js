import { Button } from 'react-bootstrap'
export const Pagination = ({clients,pageIdx,onInc}) => {
	
	const onIncrease = () => {
		if(pageIdx >= clients.length -8) return
		onInc(8)
	}
	const onDncrease = () => {
		if(!pageIdx) return
		onInc(-8)
	}

  return (
	  <div className='d-flex justify-content-between'>
		  <Button onClick={onDncrease}>prev</Button>
		  <Button onClick={onIncrease}>next</Button>
	  </div>
  )

}