import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function page() {
  
  return (
    <div className='p-5'>
      <h2 className='font-semibold text-3xl flex items-center justify-between'>Dashboard
       <CreateForm/>
      </h2>
      <FormList/>
    </div>
  )
}

export default page
