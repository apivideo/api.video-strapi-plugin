/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import pluginId from '../../pluginId'

const Initializer = ({ setPlugin }: any) => {
    const ref = useRef<any>()
    ref.current = setPlugin

    useEffect(() => {
        ref.current(pluginId)
    }, [])

    return null
}

Initializer.propTypes = {
    setPlugin: PropTypes.func.isRequired,
}

export default Initializer
