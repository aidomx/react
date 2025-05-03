'use client'

export const MissConfig = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-red-500 p-6">
      <h2 className="text-lg font-semibold mb-2">Aidomx Error</h2>
      <p className="text-sm">
        Missing configuration. Please ensure that <code>rules.root</code> and{' '}
        <code>rules.components</code> are properly defined.
      </p>
    </div>
  )
}
