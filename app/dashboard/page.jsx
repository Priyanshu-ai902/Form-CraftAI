import CreateForm from './_components/CreateForm'
import FormList from './_components/FormList'

function page() {
  return (
    <div className='p-14 mt-20 h-screen  bg-gray-950'>
      <h2 className='font-semibold text-6xl flex items-center justify-between text-green-200'>Dashboard
        <CreateForm />
      </h2>
      <FormList/>
    </div>
  )
}

export default page
