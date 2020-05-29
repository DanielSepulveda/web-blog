import React from 'react'
import classnames from 'classnames'

const TextField = ({ field, meta, label, name, type = 'text' }) => {
  return (
    <div className="w-full">
      <label
        className={classnames('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2', {
          'border-red-500': Boolean(meta.touched && meta.error),
        })}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={name}
        type={type}
        {...field}
      />
      {meta.touched && meta.error && <p className="text-red-500 text-xs italic mb-6">{meta.error}</p>}
    </div>
  )
}

export default TextField
