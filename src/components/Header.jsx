import React,{PropTypes} from 'react'

import SvgIcon from './SvgIcon/SvgIcon'
import icons from './icons.json'

import _ from 'lodash'

const defaultStyles={
    header:{
        position:'relative',
        width: '100%',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        color: '#9DA5AB',
        cursor:'pointer'
    },
    active:{
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
    },
    arrow:{
        transition: 'transform 300ms ease'
    },
    open:{
        transform: 'rotate(90deg)'
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {node,depth,styles,depthSize,fileIcon,dirIcon,rootIcon} = this.props
        const parentIcon = depth==0?rootIcon:dirIcon

        if (node.leaf) {
            depth += 1
        }

        let headerStyles=_.merge({},defaultStyles.header,{paddingLeft:`${depth*depthSize}px`})
        if (node.active) {
            _.merge(headerStyles,defaultStyles.active,styles.active)
        }
        _.merge(headerStyles,styles.header)

        let arrowStyles=_.merge({},defaultStyles.arrow,icons.arrow.style)
        if (node.open) {
            _.merge(arrowStyles,defaultStyles.open, styles.open)
        }
        _.merge(arrowStyles,styles.arrow)

        return (
            <div style={headerStyles} onClick={this.handleClick} name="header">
                {node.leaf?null:<SvgIcon style={arrowStyles} {...icons.arrow}/>}

                {node.leaf?<SvgIcon {...fileIcon}/>:<SvgIcon {...parentIcon}/>}

                {node.name}
            </div>
        )
    }
    handleClick=(e)=>{
        const {node,onClick} = this.props
        if (onClick) {
            onClick(e,node)
        }
    }
}
Header.defaultProps={
    styles:{},
    depthSize:20,
    fileIcon:icons.file,
    dirIcon:icons.dir,
    rootIcon:icons.root
}
Header.propTypes={
    node:PropTypes.object.isRequired,
    depth:PropTypes.number.isRequired,
    styles:PropTypes.object,
    fileIcon:PropTypes.object,
    dirIcon:PropTypes.object,
    rootIcon:PropTypes.object,
    depthSize:PropTypes.number,
    onClick:PropTypes.func
}
export default Header
