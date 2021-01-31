import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../../coreView/common/table';
import ListBuilder from '../../coreView/common/list-builder';
import Modal from '../../coreView/common/modal';


export default function PMProductView({itemState, appPrefs, onListLimitChange,
	onSearchChange, onSearchClick, onPaginationClick, onOrderBy, onOption, 
	closeModal, session}) {

    let columns = [];
    if (itemState.prefLabels != null && itemState.prefLabels.PM_PRODUCT_PAGE != null) {
    	columns = itemState.prefLabels.PM_PRODUCT_PAGE;
    }
    let group = "TABLE1";
    
    let header = "";
	if (itemState.prefTexts.PM_PRODUCT_PAGE != null && itemState.prefTexts.PM_PRODUCT_PAGE.PM_PRODUCT_PAGE_HEADER != null) {
		header = itemState.prefTexts.PM_PRODUCT_PAGE.PM_PRODUCT_PAGE_HEADER.value;
	}
	
	let deleteModalHeader = "Delete ";
	if (itemState.selected != null && itemState.selected.name != null) {
		deleteModalHeader += itemState.selected.name;
	}
	
	let viewPortSmall = false;
	if (session.viewPort === 'small') { viewPortSmall = true }
	
    return (
    	<div>
    		{viewPortSmall ? (
    			<ListBuilder
		  	      	itemState={itemState}
		  	      	header={header}
		  	     	columns={columns}
		  	      	appPrefs={appPrefs}
		  	      	onListLimitChange={onListLimitChange}
		  	      	onSearchChange={onSearchChange}
		  	      	onSearchClick={onSearchClick}
		  	      	onPaginationClick={onPaginationClick}
		  			onOrderBy={onOrderBy}
	  				onOption={onOption}
		  	      />
    		) : (
	    		<Table
	    			itemState={itemState}
	    			header={header}
	    			columns={columns}
	    			labelGroup = {group}
	    			appPrefs={appPrefs}
	    			onListLimitChange={onListLimitChange}
	    			onSearchChange={onSearchChange}
	    			onSearchClick={onSearchClick}
	    			onPaginationClick={onPaginationClick}
	    			onOrderBy={onOrderBy}
	    			onOption={onOption}
	    		/>
    		)}
    		<Modal isOpen={itemState.isDeleteModalOpen} onClose={() => closeModal()} >
    			<div className="modal-dialog">
    				<div className="modal-content">
    					<div className="modal-header">
    						<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
    						<h4 className="modal-title">{deleteModalHeader}</h4>
    					</div>
    					<div className="modal-body">
    						<h3>Are you sure you want to delete?</h3>
    					</div>
    					<div className="modal-footer">
    						<button type="button" className="btn btn-primary" onClick={() => onOption("DELETEFINAL",itemState.selected)}>Delete</button>
    						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => closeModal()}>Close</button>
    					</div>
    				</div>
    			</div>
    		</Modal>
    	</div>
    );
}


PMProductView.propTypes = {
  itemState: PropTypes.object.isRequired,
  appPrefs: PropTypes.object,
  onListLimitChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchClick: PropTypes.func,
  onPaginationClick: PropTypes.func,
  onOrderBy: PropTypes.func, 
  closeModal: PropTypes.func,
  onOption: PropTypes.func,
  session: PropTypes.object
};
