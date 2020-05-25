import React from 'react';



const unflattenToHTML = (list, parent, childrenList) => {
    if (list && list.length && list[0].hasOwnProperty('x')) {
        list = list.map(item => ({
            id: item.i || item.id,
            className: item.className || 'row',
            position: item.position || 0,
            parentid: item.parentid || null,
        }))
    }
    if (!parent) {
        parent = list.filter(item => item.parentid === null)
    }
    if (parent.length) {
        // console.log('in if', parent, list)
        return parent.map(par => (<div id={par.id} {...par}>
            {
                list.find(item => item.parentid === par.id) ?
                    list.filter(item => item.parentid === par.id).map(child => {
                        return renderItem(list, child, childrenList)
                    })
                    :
                    renderItem(list, par, childrenList)
            }
        </div>))
    } else {
        return (<div id={parent.id} {...parent}>
            {list.filter(item => item.parentid === parent.id).map(child => {
                return renderItem(list, child, childrenList)
            }
            )}
        </div>)
    }
};


const renderItem = (list, parent, childrenList) => {
    const children = childrenList.find(item => item.parentid === parent.key)
    // console.log('children in render item', children, parent)
    if(children) {
        return <div {...parent}>{children}</div>
    } 
    return 'asd'
}


const GridLayout = (props) => {
    // console.log('children in grid layout', props)
    // return (<div className="grid-layout">{props.children}</div>)
    return <div className="grid-layout">
        {unflattenToHTML(props.layout, null, props.children)}
    </div>
}

export default GridLayout