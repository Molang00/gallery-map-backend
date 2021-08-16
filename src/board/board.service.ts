import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/common/paginate/pagination';
import { PaginationOption } from 'src/common/paginate/pagination.option.interface';
import { PaginationFactory } from 'src/common/paginate/paginationFactory';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {
    this.boardRepository = boardRepository;
  }

  async create(createBoardDto: CreateBoardDto) {
    const board = await this.boardRepository.save(
      new Board(
        createBoardDto.writer,
        createBoardDto.title,
        createBoardDto.content,
        new Date(),
        new Date(),
        0,
      ),
    );
    return Object.assign({
      data: board,
      statusMsg: `saved successfully`,
    });
  }

  async findAll(options: PaginationOption): Promise<Pagination<object>> {
    const queryBuilder = this.boardRepository
      .createQueryBuilder('b')
      .select('b.*')
      .orderBy('b.created', 'DESC');

    return PaginationFactory.paginate(queryBuilder, options);
  }

  async findOne(id: number) {
    const foundBoard = await this.boardRepository.findOne({ id: id });
    foundBoard.readCnt += 1;
    this.boardRepository.update(id, {
      readCnt: foundBoard.readCnt,
    });
    return Object.assign(foundBoard);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    updateBoardDto.updated = new Date();
    await this.boardRepository.update(id, updateBoardDto);
    return Object.assign({
      data: { userId: id },
      statusMsg: `updated successfully`,
    });
  }

  async remove(id: number) {
    await this.boardRepository.delete({ id: id });
    return Object.assign({
      data: { userId: id },
      statusMsg: `deleted successfully`,
    });
  }
}
