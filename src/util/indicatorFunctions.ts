type columnType = "today" | "upcoming" | "optional"

export const getIndicators = (column: columnType) => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[]
}

export const getNearestIndicator = (e: React.DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50

    const nearest = indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = e.clientY - (box.top + DISTANCE_OFFSET)

            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child}
            } else {
                return closest
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1]
        }
    )

    return nearest
}
export const clearIndicatorHighlights = (column: columnType, indicatorList?: HTMLElement[]) => {
    const indicators = indicatorList || getIndicators(column)

    indicators.forEach( i => {
        i.style.opacity = "0"
    })
}

export const highlightIndicators = (e: React.DragEvent, column: columnType) => {
    const indicators = getIndicators(column)
    clearIndicatorHighlights(column, indicators)
    const nearestIndicator = getNearestIndicator(e, indicators)
    nearestIndicator.element.style.opacity = "1"
    
}