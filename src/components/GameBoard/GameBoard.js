import './gameBoard.scss';

const GameBoard = ({userName}) => {
    return (
        <div className="game">
            <div className="game-header">
                <div className="header-line"></div>
                <div className="user">{userName}</div>
                <div className='game-status'>
                    <div className='score'>
                        <div className='score-bar' data-complete="10">
                            <span class="progress-bar__text">10</span>
                        </div>
                    </div>
                    <div className='target'>30</div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard;