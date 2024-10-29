// declare module '*.svg' {
//   import * as React from 'react'
//   export const ReactComponent: React.FunctionComponent<
//     React.SVGProps<SVGSVGElement>
//   >
//   const src: string
//   export default src
// }
declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default value
}
