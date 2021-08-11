import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      data: { ...board },
      statusCode: 201,
      statusMsg: `saved successfully`,
    });
  }

  async findAll() {
    const baordList = await this.boardRepository.find();
    return Object.assign({
      data: baordList,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  async findOne(id: number) {
    const foundBoard = await this.boardRepository.findOne({ id: id });
    return Object.assign({
      data: foundBoard,
      statusCode: 200,
      statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    updateBoardDto.updated = new Date();
    await this.boardRepository.update(id, updateBoardDto);
    return Object.assign({
      data: { userId: id },
      statusCode: 204,
      statusMsg: `updated successfully`,
    });
  }

  async remove(id: number) {
    await this.boardRepository.delete({ id: id });
    return Object.assign({
      data: { userId: id },
      statusCode: 204,
      statusMsg: `deleted successfully`,
    });
  }
}
