import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _get from 'lodash/get';
import DineroInit from "../../../Global/Components/DineroInit";
import DeleteIcons from '@material-ui/icons/DeleteOutline';


// fake data generatorc
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));
const transaction = {}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "",

    // styles we need to HotProductsly on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "",
});

class HotProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotProducts: props.hotProducts
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ hotProducts: nextProps.hotProducts })
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const hotProducts = reorder(
            this.state.hotProducts,
            result.source.index,
            result.destination.index
        );

        // this.setState({
        //     hotProducts
        // });
        this.props.draggedHotProductListSaveFun(hotProducts);
    }
    handleDelete = (product, index) => {
        let hotProducts = [...this.state.hotProducts];
        hotProducts.splice(index, 1);
        this.setState({ hotProducts });
        this.props.draggedHotProductListSaveFun(hotProducts);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.state.hotProducts.map((hotProduct, index) => (
                                <Draggable key={hotProduct.id} draggableId={hotProduct.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div className='offline-transaction'>
                                                <div className='hot-product-container fwidth flex-column'>
                                                    <div className='hot-product-cardShadow flex-column flex-wrap'>
                                                        <div className='hot-product-summary-area flex-row flex-wrap fwidth'>
                                                            <div className='hot-product-each-detail flex-column align-center'>
                                                                <span className='hot-product-summary-title'>Index</span>
                                                                <span className='hot-product-summary-money'>{index+1}</span>
                                                            </div>
                                                            <div className='hot-product-each-detail flex-column align-center'>
                                                                <span className='hot-product-summary-title'>Product Name</span>
                                                                <span className='hot-product-summary-money'>{hotProduct.name}</span>
                                                            </div>
                                                            <div className='hot-product-each-detail flex-column align-center'>
                                                                <span className='hot-product-summary-title'>SKU</span>
                                                                <span className='hot-product-summary-money'>{hotProduct.sku}</span>
                                                            </div>
                                                            {/* <div className='hot-product-each-detail flex-column align-center'>
                                                                <span className='hot-product-summary-title'>Price</span>
                                                                <span className='hot-product-summary-money'>{DineroInit(_get(hotProduct, 'salePrice.amount')).toFormat('$0,0.00')}</span>
                                                            </div> */}
                                                            <div className='hot-product-each-detail flex-column align-center'>
                                                                <DeleteIcons
                                                                    onClick={() => this.handleDelete(hotProduct, index)}
                                                                    style={{ color: '#ff000096', fontSize: '3em' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default HotProducts;
